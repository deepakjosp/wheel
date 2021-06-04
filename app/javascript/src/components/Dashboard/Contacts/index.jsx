import React, { useState, useEffect, useCallback } from "react";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import dummyContacts from "constants/contacts";

import ContactTable from "./ContactTable";
import NewContactPane from "./NewContactPane";
import DeleteAlert from "./DeleteAlert";

const Contacts = () => {
  const [contacts, setContacts] = useState([{}]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const fetchContacts = useCallback(() => {
    try {
      setLoading(true);
      setContacts(dummyContacts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const onContactDelete = useCallback(() => {
    setShowDeleteAlert(true);
  }, []);

  const resetSelectedContactIds = useCallback(() => {
    setSelectedContactIds([]);
  }, []);

  const onCloseDeleteAlert = () => {
    setShowDeleteAlert(false);
    resetSelectedContactIds();
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => {
              setShowNewContactPane(true);
            }}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length,
            }}
            sortProps={{
              options: [
                {
                  value: "title",
                  label: "Title",
                },
                {
                  value: "tags",
                  label: "Tags",
                },
              ],
              onClick: () => {},
            }}
            paginationProps={{
              count: 241,
              pageNo: 1,
              pageSize: 50,
              navigate: () => {},
            }}
            toggleFilter={() => {}}
          />
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
            onContactDelete={onContactDelete}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        fetchContacts={fetchContacts}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          onClose={onCloseDeleteAlert}
          refetch={fetchContacts}
        />
      )}
    </>
  );
};

export default Contacts;
