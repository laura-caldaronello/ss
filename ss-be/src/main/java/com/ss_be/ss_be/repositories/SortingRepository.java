package com.ss_be.ss_be.repositories;

import com.ss_be.ss_be.models.Sorting;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface SortingRepository extends MongoRepository<Sorting, String> {
    @Query("{ 'groupId' : ?0 }")
    Sorting findSortingByGroupId(String groupId);
}
