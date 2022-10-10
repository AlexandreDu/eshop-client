import { Typography } from "../../typography"

export const Errormessage = ({errorMessage}) => {


    return (
        <>
            <Typography variant={'error'}>{errorMessage}</Typography>
        </>
    )
}