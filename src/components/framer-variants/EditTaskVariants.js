let editTaskVariants = {}

editTaskVariants = {
    hidden: {
        opacity: 0,
        y: '-25px'
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0,
            duration: 1.2,
            type: 'spring'
        }
    },
    exit: {
        opacity: 0,
        y: '100vh',
        transition: {
            delay: 1
        }
    }
}

export default editTaskVariants