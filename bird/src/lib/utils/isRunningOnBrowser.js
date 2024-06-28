export default function isRunningOnBrowser() {
    return typeof window !== 'undefined';
}