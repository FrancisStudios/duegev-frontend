import { Chip } from '@mui/material';
import './tag-list.component.css';

/**
 * Array<string> list of tags
 * No click, no anything just listing
 */

export type TagListProps = {
    chips: Array<string>
}

const renderChips = (chips:Array<string>) => {
    return chips.map((chiplabel)=><Chip label={chiplabel} key={chiplabel}/>);
}

const TagList = (props: TagListProps) => {
    return (
        <div id="tag-list-wrapper">
            {renderChips(props.chips)}
        </div>
    );
}

export default TagList;