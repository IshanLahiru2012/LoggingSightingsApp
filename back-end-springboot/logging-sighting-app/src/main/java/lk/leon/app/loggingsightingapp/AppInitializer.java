package lk.leon.app.loggingsightingapp;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class AppInitializer {

    public static void main(String[] args) {
        SpringApplication.run(AppInitializer.class,args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public Bucket defaultBucket(@Value("looging-sighting.appspot.com") String storageBucket) throws IOException{
        InputStream serviceAcccount = new ClassPathResource("/firebase.json").getInputStream();
        FirebaseOptions firebaseOptions = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAcccount))
                .setStorageBucket(storageBucket).build();

        if(FirebaseApp.getApps().isEmpty()){
            FirebaseApp.initializeApp(firebaseOptions);
        }
        return StorageClient.getInstance().bucket();
    }
}
