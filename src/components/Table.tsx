import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IconButton} from "@material-ui/core";
import {Delete, Info} from "@material-ui/icons";
import {Artikel} from "../Model/Artikel";
import {Institution} from "../Model/Institution";

const useStyles = makeStyles({
    table: {
        minWidth: "650px",
    },
    columnSmall: {
        width: "5%"
    },
    columnMedium: {
        width: "15%"
    },
    iconButton: {
        margin: "-16px -8px -16px -24px"
    },
    tableContainer: {
        marginTop: "16px",
        backgroundColor: "white",
        border: "1px solid #CCC",
        borderRadius: "4px"
    }
});

interface Props {
    rows: {
        id: string;
        artikel: Artikel;
        anzahl: number;
        institution: Institution;
        standort: string;
    }[];
    delete?: {
        institutionId: string;
        onDelete: (id: string) => void;
    };
    details?: {
        onClick: (id: string) => void;
    }
}

const Table: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer}>
            <MUITable className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.columnMedium}>Kategorie</TableCell>
                        <TableCell>Artikel</TableCell>
                        <TableCell className={classes.columnSmall}>Anzahl</TableCell>
                        <TableCell className={classes.columnMedium}>Institution</TableCell>
                        <TableCell className={classes.columnMedium}>Standort</TableCell>
                        {props.delete && <TableCell className={classes.columnSmall}/>}
                        {props.details && <TableCell className={classes.columnSmall}/>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.artikel.artikelKategorie.name}</TableCell>
                            <TableCell>{row.artikel.name}</TableCell>
                            <TableCell>{row.anzahl}</TableCell>
                            <TableCell>{row.institution.name}</TableCell>
                            <TableCell>{row.standort}</TableCell>
                            {props.delete && (
                                <TableCell>
                                    {row.institution.id === props.delete.institutionId && (
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={() => props.delete!.onDelete(row.id)}>
                                            <Delete/>
                                        </IconButton>
                                    )}
                                </TableCell>
                            )}
                            {props.details && (
                                <TableCell>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => props.details!.onClick(row.id)}>
                                        <Info/>
                                    </IconButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
};

export default Table;