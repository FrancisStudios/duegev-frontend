import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { PrivilegePanelProps } from "../privilege-typedefinitions.type";
import './create-user.panel.css';
import '../generic-privilege-panel.style.css';
import getString from "../../../util/language-server.util";

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
                            {getString('USER_RECRUITMENT_PANEL')}
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 11 }} color="text.secondary">
                            by Dynar Software Technologies Inc.
                        </Typography>
                        <Typography variant="body2">
                            {getString('USER_RECRUITMENT_MESSAGE')}
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