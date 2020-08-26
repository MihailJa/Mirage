import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status="My status"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("My status");
    });
    test("After creation the span should be displayed", () => {
        const component = create(<ProfileStatus status="My status"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.length).toBe(1);
    });
});