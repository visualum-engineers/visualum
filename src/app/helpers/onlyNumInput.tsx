/* This is a function to prevent users
* from putting an input other than numbers
* when input is set to number
*/
const onlyNumInput = (e: any) =>{
    if(/[e+-.]/gi.test(e.key) && e.key.length<=1) e.preventDefault()
}
export default onlyNumInput