import React from 'react';
import Grid from '@material-ui/core/Grid';

const style = {
    Page: {
      'position': 'absolute',
      'top': '20%',
      'width': '100%',
      'height': '80%',
      'flexGrow': 1,
    },
}

const Page = (props) => {
    return (
        <Grid
          container
          style={style.Page}
          spacing={0}
          alignItems='flex-start'
          justify='center'>
            {props.children}
        </Grid>
      );
}

export default Page;
