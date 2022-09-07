const cardVariants = {
    hidden: {
      opacity:0,
      y: '500px',
      borderRadius: 500
    },
    visible: {
      opacity:1,
      y:0,
      borderRadius: 16,
      transition: {
        delay:0.25,
        duration:1.20,
        type:'spring',
      }
    }
  }

  export default cardVariants