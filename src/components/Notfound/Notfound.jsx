import { useEffect, useRef } from 'react';
import './Notfound.css'
import { animate, useIsomorphicLayoutEffect, motion, useAnimation, useInView } from 'framer-motion';


function Notfound({from, to}) {

    const spanref = useRef(HTMLSpanElement);
    const outDiv = useRef();
    const isInView = useInView(outDiv)
    const sliderAnimation = useAnimation()

    useIsomorphicLayoutEffect(() => {
     
        const element = spanref.current;

        if(!element) return;

        element.textContent = String(from);

        const controls = animate(from, to, {
            duration: 3,
            ease: "easeInOut",

            onUpdate(value){
                element.textContent = value.toFixed(0);
            }
        })

        return () => {
            controls.stop();
        }
        
    }, [spanref, from, to, isInView])

    useEffect(() => {

        if (isInView) {
            sliderAnimation.start("visible")
        }

    }, [isInView])

    return (
        <div className="flex justify-center items-center h-screen bg-404Background bg-cover bg-no-repeat bg-origin-content bg-center">
            <motion.div
                ref={outDiv}
                variants={{
                    hidden: { opacity:0, x: "-100%"},
                    visible: {opacity: 1, x: "0%"},
                }} 
                initial="hidden"
                animate={sliderAnimation}
                transition={{
                    type: "tween",
                    duration: 0.8 ,
                    ease: [0.2, 0.65, 0.3, 0.9],
                    staggerChildren: 0.05
                }}
                className='text-white tracking-wide text-center'
            >
                <h1 className='text-9xl font-extrabold'>!! <span ref={spanref}></span> !!</h1>
                <h2 className='text-6xl font-semibold'>!!! Oops !!!</h2>
                <p className='text-2xl font-semibold'>Something went wrong</p>
                <p className='text-2xl font-semibold'>How did you get here please go back <a className='font-semibold underline' href="/">Home</a></p>
            </motion.div>
        </div>
    );
}

export default Notfound;