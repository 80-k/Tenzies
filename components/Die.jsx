
function Die(props){
    const handleThrow = (e) => {
        const ID = props.dice.id
        props.setDices(curr => {
            const idx = curr.findIndex(item => item.id == ID)
            return curr.map(item => 
                item.id === ID ? {...item, hold: !item.hold} : item
            )
        })
    }

    return (
        <button 
            style={{backgroundColor: props.dice.hold ? 'rgba(209, 183, 183, 0.52)' : 'white'}} 
            onClick={handleThrow}>{props.dice.value}</button>
    )
}

export default Die