

const variantsMapping = {
    h1: {component: "h1", className: 'text-2xl font-bold text-purple-800 p-4 inline-block my-2 rounded-md'},
    h2: {component: "h2", className: 'text-xl'},
    body1: {component: "p", className: ''},
    body2: {component: "span", className: 'text-md'},
    body3: {component: "span", className: 'text-sm'},
    error: {component: "p", className: 'text-purple-800'},
}

export const Typography = ({children, variant, component, ml, mr, color, bold }) => {


    let Component = variant ? variantsMapping[variant]['component'] : 'p'
    if(component) Component = component

    let className = `${variant ? variantsMapping[variant]['className'] : variantsMapping['body1']['className']} `
    if(color) className += ` ${color}`
    // margins
    if(ml) className += ` ml-${ml}`
    if(mr) className += ` mr-${mr}`

    if(bold) className += ` font-bold`


    return (
        <Component 
            className={className}
        >
            {children}
        </Component>
    )
}