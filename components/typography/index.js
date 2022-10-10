

const variantsMapping = {
    h1: {component: "h1", className: 'text-2xl text-purple-500'},
    h2: {component: "h2", className: 'text-xl'},
    body1: {component: "p", className: ''},
    body2: {component: "span", className: 'text-md'},
    body3: {component: "span", className: 'text-sm'},
    error: {component: "p", className: 'text-red-500'},
}

export const Typography = ({children, variant, component, ml, mr }) => {


    let Component = variant ? variantsMapping[variant]['component'] : 'p'
    if(component) Component = component

    let className = `${variant ? variantsMapping[variant]['className'] : variantsMapping['body1']['className']} `

    // margins
    if(ml) className += ` ml-${ml}`
    if(mr) className += ` mr-${mr}`

    return (
        <Component 
            className={className}
        >
            {children}
        </Component>
    )
}