import { Tag } from "../../tag"

export const Category = ({name}) => {

   const tagColors = {
    "men's clothing": 'blue',
    "women's clothing": "magenta",
    "electronics": "lime",
    "jewelery": "black"
   }
   if(!tagColors[name]) tagColors[name] = 'black'

    return (
        <Tag color={tagColors[name]}>{name}</Tag>
    )
}