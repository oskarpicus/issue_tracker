package security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import service.Service;

import java.util.ArrayList;

public class UserDetailsServiceImpl implements UserDetailsService {
    private final Service service;

    public UserDetailsServiceImpl(Service service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User("foo", "foo", new ArrayList<>());  // todo change to use my service
    }
}
