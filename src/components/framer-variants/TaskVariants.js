let taskVariants = {}

taskVariants = {
    hidden: {
        opacity: 0,
        y: '200px'
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.25,
            duration: .75,
            type: 'spring',
            when: 'beforeChildren'
        }
    }
}

export default taskVariants