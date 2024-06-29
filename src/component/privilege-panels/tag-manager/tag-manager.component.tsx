import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { UserPrivileges } from '../../../enum/privileges.enum';
import { PrivilegePanelProps } from '../privilege-typedefinitions.type';
import './tag-manager.component.css';


const TagMananger = (props: PrivilegePanelProps) => {

    const _isEligible: boolean = (
        props.privileges.includes(UserPrivileges.SUDO) ||
        props.privileges.includes(UserPrivileges.ADD_LABELS)
    );


    return (
        <div id='tag-manager-wrapper'>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        tag manager
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}


export default TagMananger;