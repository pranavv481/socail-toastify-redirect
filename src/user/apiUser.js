export const list = () => {
    fetch(`http://localhost:8080/api/users`, {
        method: "GET",

    }).then(res => res.json())
        .catch(err => console.log(err))

}