import React from "react";
import { Avatar, Badge, Button, Checkbox, Tooltip } from "neetoui";
import format from "date-fns/format";

const issueTypeBadgeColors = {
  internal: "blue",
  agile: "green",
  bug: "red",
};

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  onNoteDelete,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox table-fixed">
        <thead>
          <tr>
            <th className="w:auto text-tableTitle">
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left w-1/6 text-grey-tableTitle text-tableTitle">
              Title
            </th>
            <th className="text-left w-1/5 text-grey-tableTitle text-tableTitle">
              Description
            </th>
            <th className="text-center w:auto text-grey-tableTitle text-tableTitle">
              Tags
            </th>
            <th className="text-center w:auto text-grey-tableTitle text-tableTitle">
              Created Date
            </th>
            <th className="text-center w:auto text-grey-tableTitle text-tableTitle">
              Due Date
            </th>
            <th className="text-center w:auto text-grey-tableTitle text-tableTitle">
              Contact
            </th>
            <th className="text-center w-1/12 text-grey-tableTitle text-tableTitle"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => {
            const contact = {
              name: "Oliver Smith",
            };
            const createdDate = format(new Date(note.created_at), "MMM, d y");
            const dueDate = note?.due_date
              ? format(new Date(note.due_date), "MMM, d y")
              : "--";
            const badgeColor =
              issueTypeBadgeColors[notes.issueType || "internal"];
            return (
              <tr
                key={note.id}
                className={"group cursor-pointer bg-white hover:bg-gray-50"}
              >
                <td>
                  <Checkbox
                    checked={selectedNoteIds.includes(note.id)}
                    onClick={event => {
                      event.stopPropagation();
                      const index = selectedNoteIds.indexOf(note.id);
                      if (index > -1) {
                        setSelectedNoteIds([
                          ...selectedNoteIds.slice(0, index),
                          ...selectedNoteIds.slice(index + 1),
                        ]);
                      } else {
                        setSelectedNoteIds([...selectedNoteIds, note.id]);
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="flex flex-row items-center justify-start text-gray-900">
                    <a className="text-tableContent">{note.title}</a>
                  </div>
                </td>
                <td className="truncate w-1/5 text-tableContent text-coolGray-700">
                  {note.description}
                </td>
                <td className="text-tableContent text-center text-coolGray-700">
                  <Badge color={badgeColor}>Internal</Badge>
                </td>
                <td className="text-tableContent text-center text-coolGray-700">
                  {createdDate}
                </td>
                <td className="text-tableContent text-center text-coolGray-700">
                  {dueDate}
                </td>
                <td>
                  <Avatar className="my-0 mx-auto" contact={contact} />
                </td>
                <td>
                  <div className="hidden group-hover:flex">
                    <Tooltip
                      content="Edit"
                      className="inline-block flex-none"
                      position="bottom"
                    >
                      <Button style="icon" icon="ri-pencil-line" />
                    </Tooltip>
                    <Tooltip
                      content="Delete"
                      className="inline-block flex-none"
                      position="bottom"
                    >
                      <Button
                        style="icon"
                        icon="ri-delete-bin-line"
                        className="inline-block mx-2.5"
                        onClick={() => {
                          setSelectedNoteIds([note.id]);
                          onNoteDelete();
                        }}
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
