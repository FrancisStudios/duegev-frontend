import { Chip } from '@mui/material';
import './tag-manager.component.css';
import { OptionSelectCustomOption } from '../option-select/option-select.component';

export type ChipData = OptionSelectCustomOption;
export type ChipCollectionData = Array<OptionSelectCustomOption>;

export type DuegevTagManagerProps = {
    chipCollection: ChipCollectionData | [];
    deleteFromCollection: CallableFunction;
}

const DuegevTagManager = (props: DuegevTagManagerProps) => {

    const DeleteChip = (label: string, value: string) => {
        //console.log(`delete label: ${label} and ${value}`);
        props.deleteFromCollection(label, value);
    }

    const RenderChips = (chips: ChipCollectionData) => {
        return chips.map((chip: ChipData) => {
            return <Chip label={chip.label} onDelete={() => { DeleteChip(chip.label, chip.value) }} key={chip.value} />
        });
    }

    return (
        <div id='tag-manager-container'>
            {RenderChips(props.chipCollection)}
        </div>
    );
}

export default DuegevTagManager;