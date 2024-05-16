import { EventEmitter } from "eventemitter3";
import { useCallback, useEffect } from "react";

const IS_RN = navigator.product === "ReactNative";

export type CoreBridgeEventType = {
  _from: CoreBridgeEventFromType[];
  _option?: CoreBridgeEventOptionType;
  data: any;
};

export type CoreBridgeEventFromType = {
  uuid: string;
  type: string;
};

export type CoreBridgeEventOptionType = {
  destination?: "native" | string;
  roundTrip?: {
    sourceBridgeUUID: string;
    sourcePromiseMapId: string;
  };
};

export class CoreBridge {
  public readonly _ee: EventEmitter = new EventEmitter();
  public readonly _uuid = Math.random().toString(36).substring(7);
  public readonly _promiseMap = new Map<
    string,
    {
      resolve: (value: any) => void;
      reject: (value: any) => void;
    }
  >();
  // propagate message to other webview or RN
  // prevent circular propagation
  public propagate = (message: CoreBridgeEventType) => {
    // 자기 자신을 거쳐간 것은 다시 propagate 하지 않음
    if (message._from.some((from) => from.uuid === this._uuid)) return;
    // console.log(
    //   `Propagate from [${IS_RN ? "RN" : "Webview"}] ${this._uuid}`,
    //   message.data,
    //   message._from
    // );
    this.emitEvent(message.data, message._from, message._option);
  };

  public emitEvent = (
    data: any,
    _from?: CoreBridgeEventFromType[],
    _option?: CoreBridgeEventOptionType
  ) => {
    this._ee.emit("event", {
      _from: [
        ...(_from ?? []),
        {
          uuid: this._uuid,
          type: IS_RN ? "rn" : "webview",
        },
      ],
      _option,
      data,
    });
  };

  public runOnNative<Data>(functionName: string, ...functionArgs: any[]) {
    const promiseUUID = Math.random().toString(36).substring(7);
    return new Promise<Data>((resolve, reject) => {
      this._promiseMap.set(promiseUUID, { resolve, reject });
      this.emitEvent(
        { type: "runOnNative", functionName, functionArgs },
        undefined,
        {
          destination: "native",
          roundTrip: {
            sourceBridgeUUID: this._uuid,
            sourcePromiseMapId: promiseUUID,
          },
        }
      );
    });
  }

  public respondToRoundTrip(
    event: CoreBridgeEventType,
    success?: any,
    error?: any
  ) {
    this.emitEvent(
      {
        success,
        error,
      },
      undefined,
      {
        destination: event._option?.roundTrip?.sourceBridgeUUID,
        roundTrip: event._option?.roundTrip,
      }
    );
  }
}

/**
 * _ops: {
 *  targetListener: 'native' | string | undefined;
 * }
 *
 * navigation 관련 push, pop, getState
 * persistent storage 관련 get, set
 * 데이터 요청하기 (async, await)
 *
 * 등 앞으로 추가되는 것들에 대해서도 대응이 되어야함.
 *
 * request 할때 native 또는 웹뷰 uuid 를 입력하면
 * respond 할때 message 넣으면, 해당 message를 처음 만든 곳에 대해 응답을 보낼 수 있도록.
 */
// 1. 네이티브에 정보 요청하고 받기
// - 성공/ 실패 에 대한 인터페이스 필요
// - Promise 사용 필요
// 2. 웹뷰에서 특정 웹뷰로 데이터 쏘기  (필요?)

const _handleCoreBridgeEvent = (
  bridge: CoreBridge,
  event: CoreBridgeEventType
) => {
  // promise 의 경우에는 bridge 내에서 처리해주어야함
  if (
    // roundTrip 메타 정보 들어있을 경우
    event._option?.roundTrip &&
    // 메세지의 도착지가 본인일 경우
    event._option?.destination === bridge._uuid
  ) {
    const { sourcePromiseMapId } = event._option?.roundTrip!;
    const promise = bridge._promiseMap.get(sourcePromiseMapId);
    if (!promise) return;
    const { success, error } = event.data;
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(success);
    }
    bridge._promiseMap.delete(sourcePromiseMapId);
    return true;
  }

  return false;
};

/**
 *
 * @param bridge
 * @param callback should be wrapped with useCallback
 */
export const useCoreBridgeRoundTripListener = (
  bridge: CoreBridge,
  callback: (
    data: { type: "runOnNative"; functionName: string; functionArgs: any[] },
    event: CoreBridgeEventType
  ) => void
) => {
  useCoreBridgeListener(
    bridge,
    (event) => callback(event.data, event),
    (event) =>
      !!(
        (IS_RN &&
          event._option?.roundTrip &&
          event._option?.destination === "native") ||
        (!IS_RN &&
          event._option?.roundTrip &&
          event._option?.destination === bridge._uuid)
      )
  );
};
/**
 * Listen to core bridge for moving events
 * @param coreBridge
 * @param callback should be wrapped with useCallback
 */
export const useCoreBridgeListener = (
  bridge: CoreBridge,
  callback: (data: CoreBridgeEventType) => void,
  filter: (data: CoreBridgeEventType) => boolean = () => true
) => {
  const cb = useCallback(
    (data: CoreBridgeEventType) => {
      if (!filter(data)) {
        return;
      } else if (_handleCoreBridgeEvent(bridge, data)) {
        return;
      } else if (data._from.at(0)?.uuid === bridge._uuid) {
        // 본인이 만든 이벤트의 경우에는 본인은 항상 받아준다
        callback(data);
      } else if (data._option?.destination === "native" && !IS_RN) {
        return;
      } else if (
        data._option?.destination &&
        !IS_RN &&
        data._option?.destination !== bridge._uuid
      ) {
        return;
      } else {
        callback(data);
      }
    },
    [bridge, callback, IS_RN]
  );

  useEffect(() => {
    bridge._ee.on("event", cb);
    return () => {
      bridge._ee.off("event", cb);
    };
  }, [cb]);
};
