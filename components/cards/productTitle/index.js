import { ellipsis } from "../../../utility/ellipsis"

export const ProductTitle = ({title, isEllipsed = false}) => {

    let productTitle = isEllipsed ? ellipsis(title, 18) : title

    return (
        <div className="font-semibold">{productTitle}</div>
    )
}