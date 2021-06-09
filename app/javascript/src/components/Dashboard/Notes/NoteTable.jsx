import React from "react";
import { Avatar, Badge, Button, Checkbox, Tooltip } from "neetoui";
import format from "date-fns/format";

import { issueTypeBadgeColors } from "./constants";
``;

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  onNoteDelete,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--layout-fixed nui-table--hover nui-table--actions">
        <thead>
          <tr>
            <th>
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
            <th>Title</th>
            <th className="w-1/5">Description</th>
            <th>Tags</th>
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Contact</th>
            <th></th>
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
                className="cursor-pointer bg-white hover:bg-gray-50"
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
                  <Button type="link" style="link" label={note.title} />
                </td>
                <td className="truncate w-1/5">{note.description}</td>
                <td>
                  <Badge color={badgeColor}>Internal</Badge>
                </td>
                <td>{createdDate}</td>
                <td>{dueDate}</td>
                <td>
                  <Avatar contact={contact} />
                </td>
                <td className="flex">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      className="ml-2.5"
                      onClick={() => {
                        setSelectedNoteIds([note.id]);
                        onNoteDelete();
                      }}
                    />
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
