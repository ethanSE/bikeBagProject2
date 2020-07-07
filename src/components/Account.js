import React, { useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { createCustomDesign } from '../graphql/mutations'
import awsconfig from '../aws-exports'; //for bucket info
import Auth from '@aws-amplify/auth'

export default function Account() {
    useEffect(() => {
        createCustomBagTest()
    }, [])
    return (
        null
    )
}

const createCustomBagTest = async () => {
    const newBag = {
        id: 1,
        owner: 'a',
        image: {
            bucket: 'a',
            region: 'a',
            key: 'a',
            uri: 'a'
        },
        scale: 1.2,
        points: '(0,0),(1,1)',
        svg: '1212',
    }

    const newExperienceResult = await API.graphql(graphqlOperation(createCustomDesign, { input: newBag }));
    console.log(newExperienceResult)
}


//view your saved designs
//click to *order* changes to in progress
//download svg for each design
//ability to delete each design
//logout