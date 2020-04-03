import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Bedarf} from "../../../Domain/Bedarf";
import {FormButton} from "../../../components/Form/FormButton";
import PopupDialog from "../../../components/Dialog/PopupDialog";
import {Institution} from "../../../Domain/Institution";

interface Props {
    open: boolean;
    eigeneInstitution?: Institution;
    item?: Bedarf;
    onContact?: () => void;
    onDone: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        display: "flex"
    },
    left: {
        width: "180px",
        textAlign: "right",
        fontWeight: 300,
        padding: "4px 16px",
        fontStyle: "italic"
    },
    right: {
        padding: "4px 16px",
        width: "calc(100% - 180px)"
    },
    subtitle: {
        fontWeight: 500,
        marginTop: "16px",
        marginLeft: "196px"
    },
    title: {
        textAlign: "center"
    },
    footer: {
        marginTop: "32px",
        display: "flex",
        justifyContent: "center"
    },
    emptyPlaceholder: {
        fontStyle: "italic"
    }
}));

const DemandDetailsDialog: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <PopupDialog
            width="lg"
            open={props.open}
            title="Bedarfsdetails"
            firstTitle="Fertig"
            onFirst={props.onDone}>
            <Typography variant="subtitle1" className={classes.subtitle}>Benötigter Artikel</Typography>
            <div className={classes.row}>
                <span className={classes.left}>Kategorie</span>
                <span className={classes.right}>{props.item?.artikel.artikelKategorie.name}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>Artikel</span>
                <span className={classes.right}>{props.item?.artikel.name}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>Beschreibung</span>
                <span className={classes.right}>{props.item?.artikel.beschreibung}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>EAN</span>
                <span className={classes.right}>{props.item?.artikel.ean}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>Hersteller</span>
                <span className={classes.right}>{props.item?.artikel.hersteller}</span>
            </div>
            <Typography variant="subtitle1" className={classes.subtitle}>Weitere Details</Typography>
            <div className={classes.row}>
                <span className={classes.left}>Standort</span>
                <span className={classes.right}>{props.item?.standort.ort}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>Anzahl</span>
                <span className={classes.right}>{props.item?.rest}</span>
            </div>
            <div className={classes.row}>
                <span className={classes.left}>Kommentar</span>
                <span className={classes.right}>{props.item?.kommentar ||
                <span className={classes.emptyPlaceholder}>Keiner</span>}</span>
            </div>
            {props.onContact && props.eigeneInstitution?.id !== props.item?.institutionId && (
                <div className={classes.footer}>
                    <FormButton
                        onClick={props.onContact}
                        size="small">
                        Institution kontaktieren
                    </FormButton>
                </div>
            )}
        </PopupDialog>
    );
};

export default DemandDetailsDialog;