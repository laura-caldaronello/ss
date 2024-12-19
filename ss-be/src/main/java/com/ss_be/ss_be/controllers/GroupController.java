package com.ss_be.ss_be.controllers;

import com.ss_be.ss_be.models.Group;
import com.ss_be.ss_be.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GroupController {
    @Autowired
    GroupRepository groupRespository;

    @GetMapping("/{createdBy}/groups")
    ResponseEntity<List<Group>> getGroupsForUser(
            @PathVariable String createdBy
    ) {
        List<Group> groupsFound = groupRespository.findGroupsByCreatedBy(createdBy);
        if (!groupsFound.isEmpty()) {
            return ResponseEntity.ok(groupsFound);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/groups/search/{name}")
    ResponseEntity<List<Group>> getGroupsByName(
            @PathVariable String name
    ) {
        List<Group> groupsFound = groupRespository.findGroupsByName(name);
        if (!groupsFound.isEmpty()) {
            return ResponseEntity.ok(groupsFound);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/group/{groupId}")
    ResponseEntity<Group> getGroupById(
            @PathVariable String groupId
    ) {
       Group groupFound = groupRespository.findById(groupId).get();
       return ResponseEntity.ok(groupFound);
    }

    @PostMapping("/group")
    ResponseEntity<Group> createGroup(
            @RequestBody Group group
    ) {
        Group groupCreated = groupRespository.save(new Group(group.getName(), group.getCreatedBy()));
        return ResponseEntity.ok(groupCreated);
    }

    @PutMapping("/group/adduser/{groupId}/{userEmail}")
    ResponseEntity<Group> addUser(
            @PathVariable String groupId,
            @PathVariable String userEmail
    ) {
        Group group = groupRespository.findById(groupId).get();
        List<String> usersList = group.getUsers();
        if (usersList == null) {
            usersList = new ArrayList<String>();
        }
        usersList.add(userEmail);
        group.setUsers(usersList);
        return ResponseEntity.ok(group);
    }
}
