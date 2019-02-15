export default function parser(query) {
    const params = new URLSearchParams(query)

    params.forEach(element => {
        console.log(element)
    });
}