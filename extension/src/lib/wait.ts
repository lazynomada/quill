export default async function wait(time: number) {
    return new Promise((resolve) => {
        const timeout = setTimeout(function() {
            clearTimeout(timeout);

            resolve(undefined);
        }, time)
    })
}