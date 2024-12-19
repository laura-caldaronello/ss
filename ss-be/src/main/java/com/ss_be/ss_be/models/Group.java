package com.ss_be.ss_be.models;

import java.util.List;

import org.springframework.data.annotation.Id;

public class Group {
    @Id
    private String id;

    private String name;
    private String createdBy;
    private List<String> users;

    public Group(String name, String createdBy) {
        this.name = name;
        this.createdBy = createdBy;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
