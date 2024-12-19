package com.ss_be.ss_be.repositories;

import com.ss_be.ss_be.models.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GroupRepository extends MongoRepository<Group, String> {
    @Query("{ 'createdBy' : ?0 }")
    List<Group> findGroupsByCreatedBy(String createdBy);

    @Query("{ 'name' : ?0 }")
    List<Group> findGroupsByName(String name);
}
