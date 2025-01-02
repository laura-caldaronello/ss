package com.ss_be.ss_be.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

public class Sorting {
    @Id
    private String id;

    @Indexed(unique = true)
    private String groupId;

    private List<String> users;

    public Sorting(String groupId, List<String> users) {
        this.groupId = groupId;
        this.users = users;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
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
