import { motion } from "framer-motion";

const animations = {
    initial: {opacity: 0, y:100},
    animate: {opacity: 1 , y:0},
    exit:{opacity:0, y: -100},
}


const Animate_page = ({children}) =>{

    return(
        //This simply creates a simple animation for all the pages
        //The animation will slide new pages up, this is applied to all pages
        <motion.div 
        variants={animations} 
        initial="initial" 
        animate="animate" 
        exit="exit">
            {children}
        </motion.div>
    )

}
export default Animate_page