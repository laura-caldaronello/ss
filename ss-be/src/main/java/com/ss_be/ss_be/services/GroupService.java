package com.ss_be.ss_be.services;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
@Service
public class GroupService {
    public List<String> sort(List<String> members) {

        int currentIndex = members.size();

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            Random random = new Random();
            int randomIndex = random.nextInt(currentIndex);
            currentIndex--;

            // And swap it with the current element.
            String temp = members.get(currentIndex);
            members.set(currentIndex, members.get(randomIndex));
            members.set(randomIndex, temp);
        }

        return members;
    }

}
