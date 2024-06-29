import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { UserPrivileges } from '../../../enum/privileges.enum';
import { PrivilegePanelProps } from '../privilege-typedefinitions.type';
import './tag-manager.component.css';
import getString from '../../../util/language-server.util';
import SearchToolBar from '../../atomic-components/custom-search-filter-bar/custom-search-filter-bar.component';


const TagMananger = (props: PrivilegePanelProps) => {

    const _isEligible: boolean = (
        props.privileges.includes(UserPrivileges.SUDO) ||
        props.privileges.includes(UserPrivileges.ADD_LABELS)
    );

    const SEARCH_TOOLBAR_MANAGER = {
        searchChange: (searchValue: string) => {
            console.log(searchValue)
        },

        filterAll: () => { console.log('filter all') },

        filterUsers: () => { console.log('filter mine') }
    }

    return _isEligible
        ? (
            <div id='tag-manager-wrapper'>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Dûgev Tag Manager &trade;
                        </Typography>
                        <Typography sx={{ fontSize: 11, mb: 1.5 }} color="text.secondary">
                            by Dynar Software Technologies Inc.
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 12 }}>
                            {getString('TAG_MANAGER_DESCRIPTION')}
                        </Typography>
                        <Typography sx={{ fontSize: 11, mb: 1.5 }} color="text.secondary">
                            {getString('TAG_MANAGER_WARNING')}
                        </Typography>
                        <SearchToolBar
                            onSearchChange={(searchValue: string) => { SEARCH_TOOLBAR_MANAGER.searchChange(searchValue) }}
                            filterMine={() => { SEARCH_TOOLBAR_MANAGER.filterUsers() }}
                            filterAll={() => { SEARCH_TOOLBAR_MANAGER.filterAll() }}
                        />
                        <div id="tag-editor-wrapper">

                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        )

        : <></>
}


export default TagMananger;