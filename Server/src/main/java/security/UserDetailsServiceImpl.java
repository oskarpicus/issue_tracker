package security;

import exceptions.UserNotFoundException;
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
        try {
            model.User user = service.login(username);
            return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
        } catch (UserNotFoundException e) {
            throw new UsernameNotFoundException(username);
        }
    }
}
