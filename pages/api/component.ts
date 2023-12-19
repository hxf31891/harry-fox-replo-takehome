// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Component } from "../../src/types";

//added various methods to handle various functionalities
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const content = JSON.parse(
      readFileSync(`${process.cwd()}/database.json`, "utf8")
    );
    res.status(200).json(content);
  } else if (req.method === "POST") {
    //POST method adds new components

    //body should be stringified array with previous components and the new one
    writeFileSync(`${process.cwd()}/database.json`, req.body, "utf8")
    res.status(200).json({ "message": "added" });
  } else if (req.method === "PUT") {
    //PUT method is used to update a specific component i.e. change src or text

    //parse the body to get the ID of the component to update
    const body = JSON.parse(req.body);
    //get the current list from the DB file and parse it
    const content = JSON.parse(
      readFileSync(`${process.cwd()}/database.json`, "utf8")
    );
    //find the component to update's object in content array
    let toChange = content?.find((c: Component) => c.id === body?.id);
    //we will need to other components to spread when we overwrite the DB file
    let others = content?.filter((c: Component) => c.id !== body?.id);
    //create a new array with the other components, and the changing component with the updates spread into it
    let updatedArray = [...others, { ...toChange, ...body }]
    //need to sort updated array to prevent order changing
    let sortedArray = updatedArray?.sort((a: Component, b: Component) => a.id - b.id);
    //overwrite the DB file with array created above
    writeFileSync(`${process.cwd()}/database.json`, JSON.stringify(sortedArray), "utf8")
    //return the updated array, which we use update the local state
    res.status(200).json(updatedArray);
    //querying and overwriting the entire DB is obviously poor architecture in production, SQL provides vastly superior methods, but this works for our exercise
  } else if (req.method === "DELETE") {
    //DELETE method removes a component from the DB

    //parse the body to get the ID of the component to delete
    const body = JSON.parse(req.body);
    //get the current list from the DB file and parse it
    const content = JSON.parse(
      readFileSync(`${process.cwd()}/database.json`, "utf8")
    );
    //filter out deleted component, creating array of remaining components
    const remaining = content?.filter((c: Component) => c?.id !== body.id);
    //because we set ID of new components as length of components list, a bug it introduced when components are deleted that can result in comps with the same ID.
    //mapping over the remaining components and resetting the IDs to index + 1 will prevent this specific issue, but likely introduce others bugs i.e. where components are queried elsewhere based on the previous value of their ID.
    //A better solution would be to use a randomly assigned ID.
    const formatted = remaining?.map((c: Component, idx: number) => ({ ...c, id: idx + 1 }))
    //overwrite the DB file with array created above
    writeFileSync(`${process.cwd()}/database.json`, JSON.stringify(formatted), "utf8");
    //return the updated array, which we use update the local state
    res.status(200).json(formatted);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
