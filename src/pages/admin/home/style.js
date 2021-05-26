import { makeStyles } from '@material-ui/core/styles';
export const useStyles=makeStyles({
    button:{
        backgroundColor:"green",
        color:"white"
    },
    root: {
        flexGrow: 1,
        minWidth: 300,
        margin:50
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
})