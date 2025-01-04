package com.ss_be.ss_be.controllers;

import com.ss_be.ss_be.models.Group;
import com.ss_be.ss_be.models.Sorting;
import com.ss_be.ss_be.repositories.GroupRepository;
import com.ss_be.ss_be.repositories.SortingRepository;
import com.ss_be.ss_be.services.GoogleService;
import com.ss_be.ss_be.services.GroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GroupController {
    @Autowired
    GroupRepository groupRespository;

    @Autowired
    SortingRepository sortingRepository;

    @Autowired
    GroupService groupService;

    @Autowired
    GoogleService googleService;

    @GetMapping("/{createdBy}/createdgroups")
    ResponseEntity<List<Group>> getCreatedGroupsForUser(
            @PathVariable String createdBy) {
        List<Group> groupsFound = groupRespository.findGroupsByCreatedBy(createdBy);
        if (!groupsFound.isEmpty()) {
            return ResponseEntity.ok(groupsFound);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/{member}/membergroups")
    ResponseEntity<List<Group>> getMemberGroupsForUser(
            @PathVariable String member) {
        List<Group> groupsFound = groupRespository.findGroupsByMember(member);
        if (!groupsFound.isEmpty()) {
            return ResponseEntity.ok(groupsFound);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/groups/search/{name}")
    ResponseEntity<List<Group>> getGroupsByName(
            @PathVariable String name) {
        List<Group> groupsFound = groupRespository.findGroupsByName(name);
        if (!groupsFound.isEmpty()) {
            return ResponseEntity.ok(groupsFound);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/group/{groupId}")
    ResponseEntity<Group> getGroupById(
            @PathVariable String groupId) {
        Group groupFound = groupRespository.findById(groupId).get();
        return ResponseEntity.ok(groupFound);
    }

    @PostMapping("/group")
    ResponseEntity<Group> createGroup(
            @RequestBody Group group) {
        Group groupCreated = groupRespository.save(new Group(group.getName(), group.getCreatedBy(), false));
        return ResponseEntity.ok(groupCreated);
    }

    @DeleteMapping("/group/{groupId}")
    ResponseEntity<Group> deleteGroup(
            @PathVariable String groupId) {
        Group group = groupRespository.findById(groupId).get();
        if (group.getSorted()) {
            Sorting sorting = sortingRepository.findSortingByGroupId(groupId);
            sortingRepository.deleteById(sorting.getId());
        }
        groupRespository.deleteById(groupId);

        return ResponseEntity.ok(null);
    }

    @PutMapping("/group/adduser/{groupId}/{userEmail}")
    ResponseEntity<Group> addUser(
            @PathVariable String groupId,
            @PathVariable String userEmail) {
        Group group = groupRespository.findById(groupId).get();
        List<String> usersList = group.getUsers();
        if (usersList == null) {
            usersList = new ArrayList<String>();
        }
        usersList.add(userEmail);
        group.setUsers(usersList);
        groupRespository.save(group);
        return ResponseEntity.ok(group);
    }

    @PutMapping("/group/removeuser/{groupId}/{userEmail}")
    ResponseEntity<Group> removeUser(
            @PathVariable String groupId,
            @PathVariable String userEmail) {
        Group group = groupRespository.findById(groupId).get();
        List<String> usersList = group.getUsers();
        if (usersList == null) {
            usersList = new ArrayList<String>();
        }
        usersList.remove(userEmail);
        group.setUsers(usersList);
        groupRespository.save(group);
        return ResponseEntity.ok(group);
    }

    @PostMapping("/group/{groupId}/sort")
    ResponseEntity<String> sortGroup(
            @PathVariable String groupId) {
        Group groupFound = groupRespository.findById(groupId).get();
        List<String> users = new ArrayList<String>(groupFound.getUsers());
        users.add(groupFound.getCreatedBy());
        List<String> sortedUsers = groupService.sort(users);
        Sorting sorting = new Sorting(groupId, sortedUsers);
        sortingRepository.save(sorting);
        groupFound.setSorted(true);
        groupRespository.save(groupFound);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/group/{groupId}/myuser")
    ResponseEntity<String> getMyUser(
            @PathVariable String groupId,
            @RequestHeader String userToken) {
        String userEmail = googleService.verify(userToken);
        if (userEmail.length() > 0) {
            List<String> users = sortingRepository.findSortingByGroupId(groupId).getUsers();
            int length = users.size();
            int index = users.indexOf(userEmail);
            if (length == index + 1) {
                return ResponseEntity.ok(users.get(0));
            } else {
                return ResponseEntity.ok(users.get(index + 1));
            }
        } else {
            return ResponseEntity.ok(null);
        }
    }
}
