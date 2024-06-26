import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { PrivilegePanelProps } from "../privilege-typedefinitions.type";
import './create-user.panel.css';
import '../generic-privilege-panel.style.css';

const CreateUserPanel = (props: PrivilegePanelProps) => {

    const _isEligible: boolean = (
        props.privileges.includes('sudo') ||
        props.privileges.includes('recruiter')
    );

    return _isEligible
        ? (
            <div id="create-user-panel-wrapper" className="genericPanelWrapper">
                <Card >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            blinode
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
        )

        : (<></>);
}

export default CreateUserPanel;