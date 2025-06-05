"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import AddPosts from "@/components/Admin/AddPosts";
import ManagePosts from "@/components/Admin/ManagePosts";
import AddUsers from "@/components/Admin/AddUsers";
import ManageUsers from "@/components/Admin/ManageUsers";
import { useSession } from "next-auth/react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    // Check authentication and admin status
    if (status === "loading") return; // Session is still loading

    console.log(session)

    if (!session) {
      // Not authenticated - redirect to login
      router.replace("/");
    } else if (!session.user?.isAdmin) {
      // Not an admin - redirect to home
      router.replace("/homepage");
    } else {
      // Valid admin user
      setIsAdmin(true);
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading || status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Verifying admin privileges...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // Already handled by useEffect, but return null while redirecting
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "posts" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts Management
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "users" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "posts" && (
          <div className={styles.tabContent}>
            <div className={styles.left}>
              <AddPosts />
            </div>
            <div className={styles.right}>
              <ManagePosts />
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className={styles.tabContent}>
            <div className={styles.left}>
              <AddUsers />
            </div>
            <div className={styles.left}>
              <ManageUsers />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
