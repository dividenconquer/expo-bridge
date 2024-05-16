export * from "./navigation";
export type {
  CoreNavigationPushParams,
  CoreNavigationPopParams,
} from "./navigation";

export { useParams } from "./use-params";
export * from "./provider";

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native

// web => native
/*
navigation
- push
  - push with params/options
- push page in RN
- pop
  - pop to specific route
  - pop and deliver data/event to previous screen
- get current screens in stack 
- update
  - update params/options of current screen

storage
- get
    - json 
    - string (getString)
    - number (getNumber
- set
    - json 
    - string (setString)
    - number (setNumber)
- delete (delete)

event
- send (sendEvent)
- receive (useEventReceived)
- passthrough (sendPassThroughEvent)
    - webview 가 여러개 떠있을떄, 특정 webview 또는 접근 가능한 웹뷰에 전부 전달해주는 것
    - bottom sheet 등에서 일어난 이벤트를 그 뒤에 떠있는 웹뷰에게 전달하기 위함

bottom sheet
- open (openBottomSheet)
  - with data/option
- close (closeBottomSheet)

dialog?

*/
