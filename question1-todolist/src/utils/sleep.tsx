export default function sleep(seconds: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
}