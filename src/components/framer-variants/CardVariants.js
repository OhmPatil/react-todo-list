let cardVariants = {};

const isMobile = window.innerWidth < 815;

if (!isMobile) {
  cardVariants = {
    hidden: {
      opacity: 0,
      y: "200px",
      borderRadius: 500,
    },
    visible: {
      opacity: 1,
      y: 0,
      borderRadius: 16,
      transition: {
        delay: 0.25,
        duration: 1,
        type: "spring",
      },
    },
  };
} else {
  cardVariants = {
    hidden: {
      opacity: 0,
      y: "200px",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25,
        duration: 1,
        type: "spring",
        damping: 25
      },
    },
  };
}

export default cardVariants;
