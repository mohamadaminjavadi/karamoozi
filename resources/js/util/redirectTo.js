import {useHistory} from 'react-router-dom'

export default function redirectTo(destination, {res, status} = {}) {
    let History = useHistory();
    if (res) {
        res.writeHead(status || 302, {Location: destination})
        res.end()
    } else {
        if (destination[0] === '/' && destination[1] !== '/') {
            History.push(destination)
        } else {
            window.location = destination
        }
    }
}