export const Tag = ({children, color}) => {
   

    const colorsMapping = {
        purple: {
            bgColor: 'bg-[#f9f0ff]',
            color: 'text-[#531dab]',
            borderColor: 'border-[#d3adf7]'
        },
        blue: {
            bgColor: 'bg-[#e6f7ff]',
            color: 'text-[#096dd9]',
            borderColor: 'border-[#91d5ff]'
        },
        greekBlue: {
            bgColor: 'bg-[#f0f5ff]',
            color: 'text-[#1d39c4]',
            borderColor: 'border-[#adc6ff]'
        },
        magenta: {
            bgColor: 'bg-[#fff0f6]',
            color: 'text-[#c41d7f]',
            borderColor: 'border-[#ffadd2]'
        },
        red: {
            bgColor: 'bg-[#fff1f0]',
            color: 'text-[#cf1322]',
            borderColor: 'border-[#ffa39e]'
        },
        green: {
            bgColor: 'bg-[#f6ffed]',
            color: 'text-[#389e0d]',
            borderColor: 'border-[#b7eb8f]'
        },
        lime: {
            bgColor: 'bg-[#fcffe6]',
            color: 'text-[#7cb305]',
            borderColor: 'border-[#eaff8f]'
        },
        orange: {
            bgColor: 'bg-[#fff7e6]',
            color: 'text-[#d46b08]',
            borderColor: 'border-[#ffd591]'
        },
        black: {
            bgColor: 'bg-[#ffffff]',
            color: 'text-[#000000]',
            borderColor: 'border-[#677381]'
        }
    }

    const colorObj = colorsMapping[color]


    return (
        <div className={`text-xs inline-block rounded-[0.25rem] mr-[0.25rem] mb-[0.25rem] p-[0.2rem] ${colorObj.bgColor} ${colorObj.borderColor} ${colorObj.color} border-2` }
        
        >
            <span>{children}</span>
        </div>
    )
}