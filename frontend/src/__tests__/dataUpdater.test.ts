import { ISeat } from "../interfaces/interfaces";
import dataUpdater from "../utils/dataUpdater";
import seatSorter from "../utils/seatSorter";
import { describe, expect, it } from "vitest";

describe("dataUpdater function for SEAT data", () => {
    const seat1 = {
        _id: "seatId_1",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 101,
        available: true,
        inPlay: true,
        assignedTo: "",
    };

    const seat2 = {
        _id: "seatId_2",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 102,
        available: true,
        inPlay: true,
        assignedTo: "",
    };

    const seat3 = {
        _id: "seatId_3",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 101,
        available: true,
        inPlay: true,
        assignedTo: "",
    };

    const updatedSeat2 = {
        _id: "seatId_2",
        eventId: "eventId_test",
        floor: 1,
        section: "TierA",
        row: "A",
        seatNumber: 102,
        available: false,
        inPlay: true,
        assignedTo: "",
    };

    const updatedSeat3 = {
        _id: "seatId_3",
        eventId: "eventId_test",
        floor: 1,
        section: "TierC",
        row: "A",
        seatNumber: 101,
        available: false,
        inPlay: true,
        assignedTo: "",
    };

    const changeData = { available: false }
    const seatArray = [seat1, seat2, seat3];

    it('should correctly update two selected seats when passed an array of all seats, an array of two seats to update, and a key-value to change', () => {
        const selectedSeat = [seat2, seat3];
        const updatedSeatArray = [seat1, updatedSeat2, updatedSeat3]
        const result = dataUpdater(seatArray, selectedSeat, changeData);
        expect(result).toEqual(updatedSeatArray)
    });
    it('should correctly update one selected seat when passed an array of all seats, an array of one seat to update, and a key-value to change', () => {
        const selectedSeat = seat2;
        const updatedSeatArray = [seat1, updatedSeat2, seat3]
        const result = dataUpdater(seatArray, selectedSeat, changeData) as ISeat[];
        const sortedResult= seatSorter(result, "array");
        expect(sortedResult).toEqual(updatedSeatArray)
    })
})

/* 
describe("dataUpdater function for PATRON data", () => {
    const patron1 = {
        _id: "6500989ab93227fdf872b23a",
        eventID: "64ff4d7afb1a87d7b8799287",
        fullName: "Michael Hazeltine",
        numberRequested: 1,
        arrived: false,
        notes: [],
        callAhead: true,
        seatID: []
    };
    const patron2 = {
        _id: "6500989ab93227fdf872b23b",
        eventID: "64ff4d7afb1a87d7b8799287",
        fullName: "Jessica Watson",
        numberRequested: 1,
        arrived: false,
        notes: [],
        callAhead: true,
        seatID: []
    };
    const patron3 = {
        _id: "6500989ab93227fdf872b23c",
        eventID: "64ff4d7afb1a87d7b8799287",
        fullName: "Hampton",
        numberRequested: 1,
        arrived: false,
        notes: [],
        callAhead: true,
        seatID: []
    };
    const patron4 = {
        _id: "6500989ab93227fdf872b23d",
        eventID: "64ff4d7afb1a87d7b8799287",
        fullName: "Leila",
        numberRequested: 1,
        arrived: false,
        notes: [],
        callAhead: true,
        seatID: []
    };

    const changeData = { arrived: true}
    const patronArray = [patron1, patron2, patron3, patron4];

    it('should correctly update two selected seats when passed an array of all seats, an array of two seats to update, and a key-value to change', () => {
        const selectedPatron = [seat2, seat3];
        const updatedSeatArray = [seat1, updatedSeat2, updatedSeat3]
        const result = dataUpdater(seatArray, selectedSeat, changeData);
        expect(result).toEqual(updatedSeatArray)
    });
    it('should correctly update one selected seat when passed an array of all seats, an array of one seat to update, and a key-value to change', () => {
        const selectedSeat = seat2;
        const updatedSeatArray = [seat1, updatedSeat2, seat3]
        const result = dataUpdater(seatArray, selectedSeat, changeData) as ISeat[];
        const sortedResult= seatSorter(result, "array");
        expect(sortedResult).toEqual(updatedSeatArray)
    })
}) */