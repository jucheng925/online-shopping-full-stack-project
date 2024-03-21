import {Button, styled} from '@mui/material'

const StyledButton = styled(Button) ({
    variant: "contained",
    backgroundColor:"#8ebf42",
    color:"white",
    size:"medium",
    width:"40%", 
    margin:"5px 0",
    '&:hover': {
        backgroundColor: "#8ebf42",
    }

})

const RedStyledButton = styled(Button) ({
    variant: "contained",
    backgroundColor:"#bf4242",
    color:"white",
    size:"medium",
    width:"40%", 
    margin:"5px 0",
    '&:hover': {
        backgroundColor: "#bf4242",
    }
})

export default StyledButton