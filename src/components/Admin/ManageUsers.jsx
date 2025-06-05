"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/ManageUsers.module.css";
import Image from "next/image";

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [openId, setOpenId] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/register");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/register?id=${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove user from local state
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setOpenId(null); // Close modal after operation
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.user}>
          <div className={styles.details}>
            <Image
              src="https://res.cloudinary.com/dudlxsoui/image/upload/v1736441335/noavatar_f31hx9.png"
              alt="Profile Image"
              width={50}
              height={50}
            />
            <span>Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  // Filtering users
  const filteredUsers = users.filter(
    (user) =>
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className={styles.noResults}>No Users Found</p>
      ) : (
        filteredUsers.map((user) => (
          <div className={styles.user} key={user._id}>
            <div className={styles.details}>
              <Image
                src="https://res.cloudinary.com/dudlxsoui/image/upload/v1736441335/noavatar_f31hx9.png"
                alt="Profile Image"
                width={50}
                height={50}
              />
              <span>{user.fullname}</span>
              <p>{user.email}</p>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setOpenId(user._id)}
                className={styles.delete}
              >
                Delete
              </button>

              {openId === user._id && (
                <div className={styles.confirmationModal}>
                  <p>
                    <b>Are you Sure?</b>
                  </p>
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={styles.delete}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.cancel}
                      onClick={() => setOpenId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
