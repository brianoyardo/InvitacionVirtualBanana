declare module '*.png' {
  const value: string;
  export default value;
}
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}
